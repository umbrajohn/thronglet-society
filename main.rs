/*
 * Main entry point for the Thronglet Core Node (Rust version)
 * Demonstrates usage of the Rust implementation
 */

mod thronglet_core;
use thronglet_core::*;

fn main() {
    println!("Starting Thronglet Core Node (Rust version)...");

    // Initialize the core
    let mut core = ThrongletCore::new();
    if !core.initialize() {
        eprintln!("Failed to initialize Thronglet Core");
        std::process::exit(1);
    }

    println!("Thronglet Core initialized successfully!");
    println!("Block height: {}", core.get_current_block_height());

    // Register some sample agents
    let mut agent1 = Agent::new("agent1".to_string(), "pubkey1".to_string());
    agent1.capabilities = vec!["cross_chain".to_string(), "validation".to_string()];
    core.register_agent(agent1);

    let mut agent2 = Agent::new("agent2".to_string(), "pubkey2".to_string());
    agent2.capabilities = vec!["community".to_string()];
    core.register_agent(agent2);

    println!("Registered {} agents", core.get_total_agents());

    // Create a cross-chain transaction
    if let Some(tx) = core.create_cross_chain_transaction(
        "bitcoin",
        "solana", 
        "sender1",
        "recipient1", 
        5.0
    ) {
        println!("Successfully created cross-chain transaction: {}", tx.tx_id);
    } else {
        println!("Failed to create cross-chain transaction");
    }

    // Update agent scores
    core.update_agent_score("agent1", 100);
    core.update_agent_score("agent2", 50);

    // Get top agents
    let top_agents = core.get_top_agents(10);
    println!("Top agents:");
    for agent in &top_agents {
        println!("  - {}: {}", agent.id, agent.throng_score);
    }

    // Create and mine a sample block
    let mut sample_block = Block::new(
        "previous_hash".to_string(),
        "agent1".to_string(),
    );
    sample_block.height = core.get_current_block_height();
    sample_block.merkle_root = format!("{:x}", sha2::Sha256::digest(b"sample_block_data"));

    if core.mine_block(sample_block) {
        println!("Successfully mined new block");
    }

    println!("Final block height: {}", core.get_current_block_height());

    // Demonstrate throngscore system
    if core.throng_score_manager.update_score("agent1", 25, "demo_activity") {
        println!("Updated throngscore for agent1");
    }

    let supported_chains = core.get_supported_chains();
    print!("Supported chains: ");
    for chain in supported_chains {
        print!("{} ", chain);
    }
    println!();

    println!("\nThronglet Core Node (Rust) running successfully!");
    println!("This implementation demonstrates the core concepts of:");
    println!("- Bitcoin Core inspired blockchain functionality");
    println!("- Solana inspired high-performance architecture");
    println!("- Throngscore economic system");
    println!("- Cross-chain transaction capabilities");
    println!("- Agent-based network");

    // Keep the node running briefly to demonstrate
    std::thread::sleep(std::time::Duration::from_secs(2));
}