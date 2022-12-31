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
            ForEach(msgController.messages.sorted(by: { $0.recipient < $1.recipient })) { msg in
                NavigationLink {
                    EditView(id: msg.id, recipient: msg.recipient, message: msg.message, msgController: msgController)
                        .navigationTitle("Edit")
                        .navigationBarTitleDisplayMode(.inline)
                } label: {
                    Text(msg.recipient)
                }
            }
        }
        .navigationTitle("\(msgController.messages.count) People")
        .navigationBarTitleDisplayMode(.inline)
        .sheet(isPresented: $addMessage) {
            AddMessageView(msgController: msgController)
        }
        .refreshable {
            await msgController.loadData()
        }
        .listStyle(.plain)
        .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                Button {
                    addMessage = true
                } label: {
                    Label("Add", systemImage: "plus")
                }
            }
        }
        .task {
            await msgController.loadData()
        }
    }
}

struct AdminView_Previews: PreviewProvider {
    static var previews: some View {
        AdminView(msgController: MessagesController())
    }
}
