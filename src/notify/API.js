import webpush from 'web-push';

var mtMap = {
	m_isConnect: false,
	d_subscriptions: [],


	register: function() {

		// Init Webpush
		webpush.setVapidDetails(
			'mailto:test@yourdomain.com',
			process.env.VAPID_PUBLIC_KEY,
			process.env.VAPID_PRIVATE_KEY
		);

		// API
		mt.server.register('POST', '/notify/subscribe', false, (req, res) => this.api_subscribe(req, res));
		mt.server.register('POST', '/notify/send', false, (req, res) => this.api_send(req, res));
	},

	api_subscribe: function(req, res) {
		try {

			const subscription = req.body;
			const exists = this.d_subscriptions.find(s => s.endpoint === subscription.endpoint);
			if (!exists) {
				this.d_subscriptions.push(subscription);
				console.log('Đã thêm 1 thiết bị mới. Tổng số:', this.d_subscriptions.length);
			}
			res.status(201).json({ message: 'Đăng ký thành công!' });
		}
		catch (ex) {
			res.status(500).send("Error: " + ex);
		}
	},

	api_send: function(req, res) {
		try {

			const notificationPayload = JSON.stringify({
				title: req.body.title || 'Thông báo từ Hệ thống',
				body: req.body.body || 'Nội dung mặc định của PWA',
				url: req.body.url || '/'
			});

			const promises = this.d_subscriptions.map(sub => 
				webpush.sendNotification(sub, notificationPayload)
					.catch(err => {
						// Nếu lỗi 410 (Gone) hoặc 404 (Not Found) -> Token hết hạn, xóa khỏi danh sách
						if (err.statusCode === 410 || err.statusCode === 404) {
							this.d_subscriptions = this.d_subscriptions.filter(s => s.endpoint !== sub.endpoint);
						}
						console.error('Lỗi gửi đến 1 thiết bị:', err.statusCode);
					})
			);

			Promise.all(promises).then(() => {
				res.status(200).json({ message: `Đã gửi thành công đến ${this.d_subscriptions.length} thiết bị.` });
			});
		}
		catch (ex) {
			res.status(500).send("Error: " + ex);
		}
	},

};
export default mtMap;