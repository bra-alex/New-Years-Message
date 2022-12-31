//
//  LoadingView.swift
//  New Years Message Admin
//
//  Created by Don Bouncy on 31/12/2022.
//

import SwiftUI

struct LoadingView: View {
    var body: some View {
        ZStack{
            Color.black.opacity(0.5)
                .ignoresSafeArea()
            ProgressView()
//                .tint(.white)
        }
    }
}

struct LoadingView_Previews: PreviewProvider {
    static var previews: some View {
        LoadingView()
    }
}
