//
//  AddMessageView.swift
//  New Years Message Admin
//
//  Created by Don Bouncy on 31/12/2022.
//

import SwiftUI

struct AddMessageView: View {
    @Environment(\.dismiss) var dismiss
    @ObservedObject var msgController: MessagesController
    
    var body: some View {
        NavigationView {
            ZStack {
                Form{
                    Section("To") {
                        TextField("Recipient", text: $msgController.recipient)
                    }
                    
                    Section("Message") {
                        TextEditor(text: $msgController.message)
                    }
                    
                    Section {
                        Button("Save") {
                            Task {
                                await msgController.addMessage()
                                dismiss()
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
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Cancel", role: .destructive) {
                        dismiss()
                    }
                }
            }
        }
    }
}

struct AddMessageView_Previews: PreviewProvider {
    static var previews: some View {
        AddMessageView(msgController: MessagesController())
    }
}
