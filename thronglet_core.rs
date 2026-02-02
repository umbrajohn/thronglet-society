/*
 * Thronglet Core - Rust Implementation
 * Based on Solana Core architecture for high-performance operations
 * Implements the "throngscore" economy system
 */

use std::collections::{HashMap, HashSet};
use std::sync::{Arc, Mutex, RwLock};
use std::time::{SystemTime, UNIX_EPOCH};
use sha2::{Sha256, Digest};
use serde::{Deserialize, Serialize};
use rand::Rng;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Agent {
    pub id: String,
    pub public_key: String,
    pub throng_score: i32,
    pub last_activity: u64,
    pub capabilities: Vec<String>,
}

impl Agent {
    pub fn new(id: String, public_key: String) -> Self {
        Agent {
            id,
            public_key,
            throng_score: 0,
            last_activity: SystemTime::now()
                .duration_since(UNIX_EPOCH)
                .unwrap()
                .as_secs(),
            capabilities: vec![],
        }
    }

    pub fn supports_cross_chain(&self) -> bool {
        self.capabilities.contains(&"cross_chain".to_string())
    }

    pub fn can_validate_blocks(&self) -> bool {
        self.capabilities.contains(&"validation".to_string())
    }

    pub fn increment_throng_score(&mut self, delta: i32) {
        self.throng_score += delta;
        self.last_activity = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_secs();
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Transaction {
    pub tx_id: String,
    pub from_chain: String,
    pub to_chain: String,
    pub sender: String,
    pub recipient: String,
    pub amount: f64,
    pub fee: f64,
    pub timestamp: u64,
    pub signature: Vec<u8>,
    pub memo: String,
}

impl Transaction {
    pub fn new(
        from_chain: String,
        to_chain: String,
        sender: String,
        recipient: String,
        amount: f64,
    ) -> Self {
        let timestamp = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_secs();
        
        let mut rng = rand::thread_rng();
        let tx_id = format!("{:x}", rng.gen::<u64>());
        
        Transaction {
            tx_id,
            from_chain,
            to_chain,
            sender,
            recipient,
            amount,
            fee: 0.0001, // Default fee
            timestamp,
            signature: vec![],
            memo: String::new(),
        }
    }

    pub fn is_valid(&self) -> bool {
        !self.sender.is_empty() && 
        !self.recipient.is_empty() && 
        self.amount > 0.0
    }

    pub fn calculate_fee(&self) -> f64 {
        0.0001 + (self.amount * 0.001)
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Block {
    pub height: u64,
    pub hash: String,
    pub previous_block_hash: String,
    pub timestamp: u64,
    pub nonce: u64,
    pub merkle_root: String,
    pub transactions: Vec<Transaction>,
    pub miner_id: String,
}

impl Block {
    pub fn new(previous_block_hash: String, miner_id: String) -> Self {
        let timestamp = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_secs();
        
        Block {
            height: 0,
            hash: String::new(),
            previous_block_hash,
            timestamp,
            nonce: 0,
            merkle_root: String::new(),
            transactions: vec![],
            miner_id,
        }
    }

    pub fn calculate_hash(&self) -> String {
        let data = format!(
            "{}{}{}{}{}{}{}",
            self.height,
            self.previous_block_hash,
            self.timestamp,
            self.nonce,
            self.merkle_root,
            self.miner_id,
            self.transactions.len()
        );
        
        let mut hasher = Sha256::new();
        hasher.update(data.as_bytes());
        format!("{:x}", hasher.finalize())
    }

    pub fn verify_proof_of_work(&self, difficulty: u32) -> bool {
        let hash = self.calculate_hash();
        if hash.len() < difficulty as usize {
            return false;
        }
        
        for i in 0..difficulty {
            if hash.chars().nth(i as usize) != Some('0') {
                return false;
            }
        }
        true
    }

    pub fn mine(&mut self, difficulty: u32) {
        while !self.verify_proof_of_work(difficulty) {
            self.nonce += 1;
            if self.nonce % 100000 == 0 {
                // Yield to other threads
                std::thread::sleep(std::time::Duration::from_micros(1));
            }
        }
        
        self.hash = self.calculate_hash();
    }

    pub fn is_valid(&self) -> bool {
        !self.hash.is_empty() && 
        !self.previous_block_hash.is_empty() && 
        self.height >= 0
    }
}

#[derive(Debug)]
pub struct ThrongScoreManager {
    scores: Arc<RwLock<HashMap<String, i32>>>,
    historical_scores: Arc<RwLock<HashMap<String, Vec<i32>>>>,
}

impl ThrongScoreManager {
    pub fn new() -> Self {
        ThrongScoreManager {
            scores: Arc::new(RwLock::new(HashMap::new())),
            historical_scores: Arc::new(RwLock::new(HashMap::new())),
        }
    }

    pub fn update_score(&self, agent_id: &str, score_delta: i32, reason: &str) -> bool {
        let mut scores = self.scores.write().unwrap();
        let mut historical = self.historical_scores.write().unwrap();
        
        let current_score = scores.entry(agent_id.to_string()).or_insert(0);
        *current_score += score_delta;
        
        let history = historical.entry(agent_id.to_string()).or_insert_with(Vec::new);
        history.push(*current_score);
        
        true
    }

    pub fn calculate_score(&self, agent_id: &str, activity_type: &str, base_value: i32) -> i32 {
        let weight = match activity_type {
            "transaction" => 1.0,
            "validation" => 5.0,
            "cross_chain" => 10.0,
            "community" => 3.0,
            _ => 1.0,
        };
        
        (base_value as f64 * weight) as i32
    }

    pub fn get_rankings(&self, limit: Option<usize>) -> Vec<(String, i32)> {
        let scores = self.scores.read().unwrap();
        let mut rankings: Vec<(String, i32)> = scores
            .iter()
            .map(|(id, &score)| (id.clone(), score))
            .collect();
        
        rankings.sort_by(|a, b| b.1.cmp(&a.1));
        
        if let Some(limit_val) = limit {
            rankings.truncate(limit_val);
        }
        
        rankings
    }

    pub fn calculate_rewards(&self, total_reward: f64) -> Vec<(String, f64)> {
        let rankings = self.get_rankings(None);
        
        if rankings.is_empty() {
            return vec![];
        }
        
        let total_score: i32 = rankings.iter().map(|(_, score)| score).sum();
        
        if total_score <= 0 {
            return vec![];
        }
        
        rankings
            .iter()
            .map(|(id, score)| {
                let reward = (*score as f64 / total_score as f64) * total_reward;
                (id.clone(), reward)
            })
            .collect()
    }

    pub fn get_throng_score(&self, agent_id: &str) -> Option<i32> {
        let scores = self.scores.read().unwrap();
        scores.get(agent_id).copied()
    }
}

#[derive(Debug)]
pub struct ThrongletCore {
    block_height: u64,
    chain: Vec<Block>,
    agents: Arc<RwLock<HashMap<String, Agent>>>,
    throng_score_manager: Arc<ThrongScoreManager>,
    initialized: bool,
}

impl ThrongletCore {
    pub fn new() -> Self {
        ThrongletCore {
            block_height: 0,
            chain: vec![],
            agents: Arc::new(RwLock::new(HashMap::new())),
            throng_score_manager: Arc::new(ThrongScoreManager::new()),
            initialized: false,
        }
    }

    pub fn initialize(&mut self) -> bool {
        if self.initialized {
            return true;
        }

        // Create genesis block
        let mut genesis = Block::new(
            "0000000000000000000000000000000000000000000000000000000000000000".to_string(),
            "genesis".to_string(),
        );
        
        genesis.height = 0;
        genesis.merkle_root = format!("{:x}", Sha256::digest(b"genesis"));
        
        // Mine the genesis block with difficulty 4
        genesis.mine(4);
        
        self.chain.push(genesis);
        self.block_height = 1;
        self.initialized = true;
        
        true
    }

    pub fn process_transaction(&self, tx: &Transaction) -> bool {
        tx.is_valid()
    }

    pub fn mine_block(&mut self, mut block: Block) -> bool {
        block.mine(4); // Difficulty of 4
        self.chain.push(block);
        self.block_height += 1;
        true
    }

    pub fn validate_block(&self, block: &Block) -> bool {
        if block.height != self.block_height {
            return false;
        }
        
        if block.previous_block_hash != self.chain.last().unwrap().hash {
            return false;
        }
        
        block.verify_proof_of_work(4)
    }

    pub fn add_block_to_chain(&mut self, mut block: Block) -> bool {
        if !self.validate_block(&block) {
            return false;
        }
        
        // Update throngscore for miner
        self.throng_score_manager
            .update_score(&block.miner_id, 25, "block_mined");
        
        self.chain.push(block);
        self.block_height += 1;
        
        true
    }

    pub fn register_agent(&self, agent: Agent) -> bool {
        let mut agents = self.agents.write().unwrap();
        if agents.contains_key(&agent.id) {
            return false; // Agent already exists
        }
        
        agents.insert(agent.id.clone(), agent);
        true
    }

    pub fn update_agent_score(&self, agent_id: &str, score_delta: i32) -> bool {
        let agents = self.agents.read().unwrap();
        if !agents.contains_key(agent_id) {
            return false;
        }
        
        drop(agents);
        self.throng_score_manager
            .update_score(agent_id, score_delta, "manual_update");
        
        true
    }

    pub fn get_top_agents(&self, count: usize) -> Vec<Agent> {
        let rankings = self.throng_score_manager.get_rankings(Some(count));
        let agents = self.agents.read().unwrap();
        
        let mut top_agents = Vec::new();
        for (id, _) in rankings {
            if let Some(agent) = agents.get(&id) {
                top_agents.push(agent.clone());
            }
        }
        
        top_agents
    }

    pub fn create_cross_chain_transaction(
        &self,
        from_chain: &str,
        to_chain: &str,
        sender: &str,
        recipient: &str,
        amount: f64,
    ) -> Option<Transaction> {
        let tx = Transaction::new(
            from_chain.to_string(),
            to_chain.to_string(),
            sender.to_string(),
            recipient.to_string(),
            amount,
        );
        
        if self.process_transaction(&tx) {
            Some(tx)
        } else {
            None
        }
    }

    pub fn get_throng_score(&self, agent_id: &str) -> Option<i32> {
        self.throng_score_manager.get_throng_score(agent_id)
    }

    pub fn get_supported_chains(&self) -> Vec<String> {
        vec!["bitcoin".to_string(), "solana".to_string(), "thronglet".to_string()]
    }

    pub fn get_current_block_height(&self) -> u64 {
        self.block_height
    }

    pub fn get_total_agents(&self) -> usize {
        let agents = self.agents.read().unwrap();
        agents.len()
    }
}

// Example usage function
pub fn example_usage() {
    println!("Initializing Thronglet Core with Rust implementation...");
    
    let mut core = ThrongletCore::new();
    core.initialize();
    
    // Create an agent
    let agent = Agent::new("agent1".to_string(), "pubkey1".to_string());
    core.register_agent(agent);
    
    // Create a cross-chain transaction
    if let Some(tx) = core.create_cross_chain_transaction(
        "bitcoin",
        "solana",
        "sender1",
        "recipient1",
        10.0,
    ) {
        println!("Created transaction: {}", tx.tx_id);
    }
    
    // Update agent score
    core.update_agent_score("agent1", 100);
    
    // Get top agents
    let top_agents = core.get_top_agents(5);
    println!("Top agents: {:?}", top_agents);
    
    println!("Thronglet Core initialized with {} agents", core.get_total_agents());
}