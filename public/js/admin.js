document.getElementById("deleteBtn").addEventListener("click", async function() {
	await deleteMessage(this)
})

const deleteMessage = async (btn) => {
    const messageId = btn.parentNode.querySelector('[name=messageId]').value
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value

    const message = btn.closest('article')
    
    try {
        await fetch(`/admin/message/${messageId}`, {
            method: 'DELETE',
            headers: {
                'csrf-token': csrf
            }
        })
        
        message.parentNode.removeChild(message)
    } catch (e) {
        console.log(e);
    }
}