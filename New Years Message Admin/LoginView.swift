//
//  LoginView.swift
//  New Years Message Admin
//
//  Created by Don Bouncy on 31/12/2022.
//

import SwiftUI

struct LoginView: View {
    @Environment(\.dismiss) var dismiss
    @Environment(\.managedObjectContext) var moc
    
    @FetchRequest(sortDescriptors: []) var tokens: FetchedResults<Authentication>
    
    @ObservedObject var authController: AuthController
    
    var body: some View {
        ZStack {
            if authController.processing {
                LoadingView()
            }
            
            VStack {
                Spacer()
                
                VStack{
                    Text("Username")
                        .font(.headline)
                    TextField("Username", text: $authController.username)
                        .padding(.horizontal)
                        .textInputAutocapitalization(.never)
                }
                .padding(.vertical)
                
                VStack{
                    Text("Password")
                        .font(.headline)
                    SecureField("Password", text: $authController.password)
                        .padding(.horizontal)
                }
                
                Button {
                    Task {
                        await authController.login()
                        
                        if !tokens.isEmpty{
                            let token = tokens[0]
                            moc.delete(token)
                            
                            try? moc.save()
                        }
                        
                        let auth = Authentication(context: moc)
                        auth.token = authController.token
                        try? moc.save()
                    }
                    
                    print(authController.token)
                    
                    if !authController.loggedOut {
                        dismiss()
                    }
                } label: {
                    Text("Login")
                }
                
                Spacer()
            }
            .blur(radius: authController.processing ? 3 : 0)
            .animation(.default, value: authController.processing)
            .alert("Error", isPresented: $authController.error) {
                Button("Okay") {}
            } message: {
                Text(authController.message)
            }
        }
    }
}

struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView(authController: AuthController())
    }
}
