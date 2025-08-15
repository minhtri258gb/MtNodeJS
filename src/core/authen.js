import crypto from 'crypto';
import jwt from 'jsonwebtoken';

var mtAuthen = {
	m_accessToken: '',

	accessToken(password) {

		const salt = '-1393153393';
		const hashPW = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

		const result = (hashPW === 'cfc4169ff17813f0413ca274eca9d339f36a5dc372ac2d3f19d177371e10da00ebaa37980a9f399ab04da6ecdf654340cb0a306e205a067763ea55945beb7188');

		this.m_accessToken = '';
		if (result) {
			let payload = { password };
			this.m_accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: '4h', // Token hết hạn sau 4 giờ
			});
		}

		return this.m_accessToken;
	},
	check(token) {
		return (token == this.m_accessToken);
	},
	protected(req, res, next) {

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