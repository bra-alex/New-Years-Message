const deleteProduct = async (btn) => {
    const productId = btn.parentNode.querySelector('[name=productId]').value
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value

    const product = btn.closest('article')

    try {
        await fetch(`/admin/product/${productId}`, {
            method: 'DELETE',
            headers: {
                'csrf-token': csrf
            }
        })
        
        product.parentNode.removeChild(product)
    } catch (e) {
        console.log(e);
    }
}