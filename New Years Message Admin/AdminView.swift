//
//  AdminView.swift
//  New Years Message Admin
//
//  Created by Don Bouncy on 31/12/2022.
//

import SwiftUI

struct AdminView: View {
    @ObservedObject var msgController: MessagesController
    
    @State private var addMessage = false
    
    var body: some View {
        List{
            ForEach(msgController.messages) { msg in
                NavigationLink {
                    
                } label: {
                    Text(msg.recipient)
                }
            }
            .sheet(isPresented: $addMessage) {
                AddMessageView(msgController: msgController)
            }
        }
        .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                Button {
                    addMessage.toggle()
                } label: {
                    Label("Add", systemImage: "plus")
                }
            }
        }
    }
}

struct AdminView_Previews: PreviewProvider {
    static var previews: some View {
        AdminView(msgController: MessagesController())
    }
}
