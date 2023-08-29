// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use crook_calculator;

#[tauri::command]
fn compute(equation: &str) -> String {
    match crook_calculator::compute(equation) {
        Some(res) => res.to_string() + " ",
        None => String::from("Invalid")
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![compute])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
