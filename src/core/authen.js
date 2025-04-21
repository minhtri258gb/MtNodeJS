import jwt from 'jsonwebtoken';

var mtAuthen = {
	m_accessToken: '',

	accessToken: function(password) {

		const result = (password === '-1393153393');

		this.m_accessToken = '';
		if (result) {
			let payload = { password };
			this.m_accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: '4h', // Token hết hạn sau 4 giờ
			});
		}

		return this.m_accessToken;
	},
	check: function(token) {
		return (token == this.m_accessToken);
	},
	protected: function(req, res, next) {

		// Lấy header Authorization
		const authHeader = req.headers['authorization'];

		// Kiểm tra xem header có tồn tại và bắt đầu bằng 'Bearer '
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return res.status(401).json({ message: 'Không có token hoặc token không hợp lệ' });
		}

		// Trích xuất token (bỏ phần 'Bearer ')
		const token = authHeader.split(' ')[1];

		try {
			// Xác minh token với secret key
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = decoded; // Lưu thông tin user từ token vào req để sử dụng ở các route sau
			next(); // Cho phép đi tiếp
		}
		catch (error) {
			return res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
		}
	},

};
export default mtAuthen;