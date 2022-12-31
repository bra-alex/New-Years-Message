//
//  AuthController.swift
//  New Years Message Admin
//
//  Created by Don Bouncy on 31/12/2022.
//

import Foundation
import SwiftUI

class AuthController: ObservableObject{
    
    @Published var loggedOut = false
    @Published var processing = false
    @Published var username = ""
    @Published var password = ""
    @Published var error = false
    @Published var message = ""
    @Published var token = ""
    
    func login() async {
        DispatchQueue.main.async {
            self.processing = true
        }
        
        let body = ["username": username, "password": password]
        
        guard let encodedData = try? JSONEncoder().encode(body) else {
            print("Encoding failed!")
            return
        }
        
        let url = URL(string: "https://new-years-message.onrender.com/api/v1/login")!
        
        var request = URLRequest(url: url)
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpMethod = "POST"
        
        do{
            let (data, _) = try await URLSession.shared.upload(for: request, from: encodedData)
            
            let response = try JSONDecoder().decode([String: String].self, from: data)
            DispatchQueue.main.async {
                self.token = response["token"]!
                
                self.loggedOut = false
                self.processing = false
            }
        } catch {
            DispatchQueue.main.async {
                self.error = true
                self.message = "Invalid username or password"
                self.processing = false
                
            }
        }
    }
}
