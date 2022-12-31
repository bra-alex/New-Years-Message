//
//  EditView.swift
//  New Years Message Admin
//
//  Created by Don Bouncy on 31/12/2022.
//

import SwiftUI

struct EditView: View {
    @Environment(\.dismiss) var dismiss
    
    @State var id: String
    @State var recipient: String
    @State var message: String
    
    @ObservedObject var msgController: MessagesController
    
    var body: some View {
        ZStack {
            Form{
                Section("To") {
                    TextField("Recipient", text: $recipient)
                }
                
                Section("Message") {
                    TextEditor(text: $message)
                        .frame(height: 300)
                }
                
                Section {
                    Button("Save") {
                        Task {
                            msgController.recipient = recipient
                            msgController.message = message
                            await msgController.updateMessage(id)
                        }
                    }
                }
            }
            .blur(radius: msgController.processing ? 3 : 0)
            .animation(.default, value: msgController.processing)
            
            if msgController.processing{
                LoadingView()
            }
        }
        .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                Button(role: .destructive) {
                    Task {
                        await msgController.deleteMessage(id)
                        dismiss()
                    }
                } label: {
                    Label("Delete", systemImage: "trash")
                }
                .buttonStyle(.borderless)
            }
        }
    }
}

struct EditView_Previews: PreviewProvider {
    static var previews: some View {
        EditView(id: "", recipient: "", message: "", msgController: MessagesController())
    }
}
