//
//  MessagesModel.swift
//  New Years Message Admin
//
//  Created by Don Bouncy on 31/12/2022.
//

import Foundation

struct Messages: Codable, Identifiable {
    var id: String
    let recipient: String
    let message: String
    
    enum CodingKeys: String, CodingKey {
        case id = "_id", recipient, message
    }
}
