//
//  ContentView.swift
//  New Years Message Admin
//
//  Created by Don Bouncy on 31/12/2022.
//

import SwiftUI

struct ContentView: View {
    @Environment(\.managedObjectContext) var moc
    @FetchRequest(sortDescriptors: []) var tokens: FetchedResults<Authentication>
    @StateObject var msgController = MessagesController()
    @StateObject var authController = AuthController()
    
    var body: some View {
        NavigationStack{
            AdminView(msgController: msgController)
        }
        .task {
            msgController.token = tokens.isEmpty ? "" : tokens[0].token!
            await msgController.loadData()
            
            authController.loggedOut = msgController.loggedOut
        }
        .fullScreenCover(isPresented: $authController.loggedOut) {
            LoginView(authController: authController)
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
