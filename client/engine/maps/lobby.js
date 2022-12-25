mt.map = {
	name: "lobby",
	load: function() {
		// var scene = new BABYLON.Scene(app.engine);
		// scene.clearColor = new BABYLON.Color3(0.8, 0.9, 1);
		
		// var camera = new BABYLON.ArcRotateCamera("Camera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);
		// camera.useAutoRotationBehavior = true;
		// scene.activeCamera.attachControl(canvas);
		
		// var light = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 0), scene);
		
		// var origin = BABYLON.Mesh.CreateSphere("origin", 10, 1.0, scene);
		
		// var torus = BABYLON.Mesh.CreateTorus("torus", 5, 1, 10, scene, false);
		
		// var box = BABYLON.Mesh.CreateBox("box", 3.0, scene);
		// box.position = new BABYLON.Vector3(-5, 0, 0); 
		
		// var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 3, 3, 3, 6, 1, scene, false);
		
		// cylinder.position = new BABYLON.Vector3(5, 0, 0);	
		// return scene;

		mt.babylon.scene = new BABYLON.Scene(mt.babylon.engine);
		
		this.camera();
		this.light();
		this.sky();
		this.terrain();
		this.ground();
		this.house();
		
	},

	camera: function() {

		let canvas = mt.html.canvas;
		let scene = mt.babylon.scene;

		let camera = new BABYLON.UniversalCamera("UniversalCamera", mt.vec3(0, 1, -5), scene);
		// let camera = new BABYLON.FlyCamera("FlyCamera", new BABYLON.Vector3(0, 0, -10), scene);

		camera.fov = 0.9;
		camera.inertia = 0.0;
		camera.speed = 10;
		camera.angularSensibility = 1000;
		// camera.inverseRotationSpeed = 0.4;
		// camera.rollCorrect = 10;
		// camera.bankedTurn = true;
		// camera.bankedTurnLimit = Math.PI / 2;
		// camera.bankedTurnMultiplier = 1;
		// camera.attachControl(mt.html.canvas, true);
		// camera.maxZ = 1024;
		
		camera.setTarget(mt.vec3(0, 1, 0));
		camera.attachControl(canvas, true);

		// scene.preventDefaultOnPointerDown = false;
		canvas.addEventListener('click', () => { canvas.requestPointerLock(); });

		mt.babylon.camera = camera;
	},

	light: function() {
		let light = new BABYLON.HemisphericLight("hemiLight", mt.vec3(-1, 1, 0), mt.babylon.scene);
		light.diffuse = new BABYLON.Color3(1, 1, 1);
	},

	sky: function() {
		let scene = mt.babylon.scene;
		let skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
		let skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
		skyboxMaterial.backFaceCulling = false;
		skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("/engine/skybox/skybox", scene);
		skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
		skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
		skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
		skybox.material = skyboxMaterial;
	},

	terrain: function() {

		var mapSubX = 512;             // point number on X axis
		var mapSubZ = 512;              // point number on Z axis
		var seed = 0.9;                 // seed
		var noiseScale = 0.006;         // noise frequency
		var elevationScale = 20.0;
		noise.seed(seed);
		var mapData = new Float32Array(mapSubX * mapSubZ * 3); // 3 float values per point : x, y and z

		var paths = [];                             // array for the ribbon model
		for (var l = 0; l < mapSubZ; l++) {
			var path = [];                          // only for the ribbon
			for (var w = 0; w < mapSubX; w++) {
				var x = (w - mapSubX * 0.5) * 2.0;
				var z = (l - mapSubZ * 0.5) * 2.0;
				var y = noise.simplex2(x * noiseScale, z * noiseScale);
				y *= (0.5 + y) * y * elevationScale;   // let's increase a bit the noise computed altitude
					
				mapData[3 *(l * mapSubX + w)] = x;
				mapData[3 * (l * mapSubX + w) + 1] = y;
				mapData[3 * (l * mapSubX + w) + 2] = z;
				
				path.push(new BABYLON.Vector3(x, y, z));
			}
			paths.push(path);
		}

		var map = BABYLON.MeshBuilder.CreateRibbon("m", {pathArray: paths, sideOrientation: 2}, mt.babylon.scene);
		map.position.y = -1.0;
		var mapMaterial = new BABYLON.StandardMaterial("mm", mt.babylon.scene);
		map.material = mapMaterial;

		// Texture
		var terrainTexture = new BABYLON.Texture("/engine/texture/ground.jpg", mt.babylon.scene);
		terrainTexture.uScale = 4.0;
		terrainTexture.vScale = terrainTexture.uScale;
		mapMaterial.diffuseTexture = terrainTexture;

	},

	ground: function() {
    	let ground = BABYLON.MeshBuilder.CreateGround("ground", {width:256, height:256});

		let groundMat = new BABYLON.StandardMaterial("groundMat");
		groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
		ground.material = groundMat;
	},

	house: function() {
		let box = BABYLON.MeshBuilder.CreateBox("box", {});
		box.position.y = 0.5;
		let boxMat = new BABYLON.StandardMaterial("boxMat");
		boxMat.diffuseTexture = new BABYLON.Texture("/engine/texture/floor.png")
		box.material = boxMat;

		let roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.3, height: 1.2, tessellation: 3});
		roof.scaling.x = 0.75;
		roof.rotation.z = Math.PI / 2;
		roof.position.y = 1.22;
		let roofMat = new BABYLON.StandardMaterial("roofMat");
		roofMat.diffuseTexture = new BABYLON.Texture("/engine/texture/roof.jpg");
		roof.material = roofMat;
	}

};
