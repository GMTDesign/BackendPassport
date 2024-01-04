export async function deleteController(req, res) {
    req.session.destroy(error => {
        if (error) {
            return res.status(500).json({ status: 'error', body: error })
        }
        res.status(204).json({ status: 'success', message: 'Logout exitoso!' })
    })
}