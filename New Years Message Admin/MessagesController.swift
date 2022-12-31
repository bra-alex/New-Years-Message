//
//  MessagesController.swift
//  New Years Message Admin
//
//  Created by Don Bouncy on 31/12/2022.
//

import Foundation

class MessagesController: ObservableObject{
    @Published var messages = [Messages]()
    @Published var loggedOut = true
    @Published var processing = false
    @Published var recipient = ""
    @Published var message = ""
    @Published var token = ""
    
    func loadData() async {
        guard let url = URL(string: "https://new-years-message.onrender.com/api/v1/admin") else {
            print("Could not connect")
            return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        request.addValue("Bearer " + token, forHTTPHeaderField: "Authorization")
        
        do{
            let (data, response) = try await URLSession.shared.data(for: request)
            let urlResponse = response as! HTTPURLResponse
            
            if urlResponse.statusCode == 200{
                if let decodedData = try? JSONDecoder().decode([Messages].self, from: data){
                    DispatchQueue.main.async {
                        self.messages = decodedData
                        self.loggedOut = false
                    }
                }
            }
            
        } catch {
            print("Error")
        }
    }
    
    func addMessage() async {
        DispatchQueue.main.async {
            self.processing = true
        }
        
        let body = ["recipient": recipient, "message": message]
        
        guard let encodedData = try? JSONEncoder().encode(body) else {
            print("Encoding failed!")
            return
        }
        
        let url = URL(string: "https://new-years-message.onrender.com/api/v1/admin/add-message")!
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.addValue("Bearer " + token, forHTTPHeaderField: "Authorization")
        
        do{
            let (data, response) = try await URLSession.shared.upload(for: request, from: encodedData)
            let urlResponse = response as! HTTPURLResponse
            
            if urlResponse.statusCode == 201{
                if let decodedData = try? JSONDecoder().decode([String: String].self, from: data){
                    print(decodedData)
                    await loadData()
                    DispatchQueue.main.async {
                        self.processing = false
                    }
                    return
                }
            }
            
        } catch {
            DispatchQueue.main.async {
                print(error.localizedDescription)
                self.processing = false
            }
        }
    }
    
    func updateMessage(_ messageId: String) async {
        DispatchQueue.main.async {
            self.processing = true
        }
        
        let body = ["recipient": recipient, "message": message]
        
        guard let encodedData = try? JSONEncoder().encode(body) else {
            print("Encoding failed!")
            return
        }
        
        let url = URL(string: "https://new-years-message.onrender.com/api/v1/admin/edit-message/\(messageId)")!
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.addValue("Bearer " + token, forHTTPHeaderField: "Authorization")
        
        do{
            let (data, response) = try await URLSession.shared.upload(for: request, from: encodedData)
            let urlResponse = response as! HTTPURLResponse
            
            if urlResponse.statusCode == 201{
                if let decodedData = try? JSONDecoder().decode([String: String].self, from: data){
                    print(decodedData)
                    await loadData()
                    DispatchQueue.main.async {
                        self.processing = false
                    }
                    return
                }
            }
            
        } catch {
            DispatchQueue.main.async {
                print(error.localizedDescription)
                self.processing = false
            }
        }
    }
}
