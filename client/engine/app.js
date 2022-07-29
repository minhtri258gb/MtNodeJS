var engine = {

	canvas: null, // element canvas html
	engine: null, // engine of babylon
	scene: null, // scene of bablon

	init: function() {
		this.canvas = document.getElementById("canvas");
		this.engine = new BABYLON.Engine(this.canvas, true);
		this.engine.enableOfflineSupport = true;

		// Scene
		this.scene = new BABYLON.Scene(this.engine);
		this.scene.clearColor = new BABYLON.Color3.Black();

		// Camera
		this.camera = new BABYLON.ArcRotateCamera("Camera", Math.PI/2, Math.PI/2, 1, BABYLON.Vector3.Zero(), this.scene);
		this.camera.attachControl(this.canvas, true);
		this.camera.fov = BABYLON.Tools.ToRadians(90);
		this.camera.angularSensibilityX = -500;
		this.camera.angularSensibilityY = -500;
		this.camera.inertia = 0;
		this.camera.pinchPercentage = 0;
		this.camera.panningSensibility = 0;
		this.camera.useNaturalPinchZoom = false;
		this.camera.inputs.remove(this.camera.inputs.attached.mousewheel);
		this.camera.inputs.remove(this.camera.inputs.attached.keyboard);

		// Render
		this.engine.runRenderLoop(() => {
			this.scene.render();
		});

		// Resize window event
		window.addEventListener("resize", () => {
			this.engine.resize();
		});
	}

};