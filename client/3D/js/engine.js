var engine = {

	init: function() {

		// Scene
		const scene = new THREE.Scene();
		scene.background = new THREE.Color(0x000000);
		
		// Camera
		const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.set(0, 0, 5);
		camera.lookAt(0, 0, 0);
		
		// Light
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
		scene.add(ambientLight);
		
		const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
		dirLight.position.set(10, 20, 0); // x, y, z
		scene.add(dirLight);
		
		// Geometry
		// let geometry = new THREE.PlaneGeometry(3, 3, 32);
		let geometry = new THREE.BoxGeometry( 3, 1, 3 ); // width, height, depth
		// let geometry = new THREE.CylinderGeometry(1,5, 1.5, 1, 32);
		// let geometry = new THREE.IcosahedronGeometry(1,5, 8);
		// let geometry = new THREE.ConeGeometry(1, 2, 32);
		// let geometry = new THREE.SphereGeometry(1.5, 32, 32);
		
		// Material
		// const material = new THREE.MeshBasicMaterial( { color: 0xfb8e00  } );
		// const material = new THREE.MeshLambertMaterial( { color: 0xfb8e00  } );
		const material = new THREE.MeshPhongMaterial( { color: 0xfb8e00  } );
		
		// Mesh
		const mesh = new THREE.Mesh( geometry, material );
		mesh.position.set(0, 0, 0); // Optional, 0,0,0 is the default
		mesh.rotation.set(15 /180 * Math.PI, 0, 0);
		scene.add(mesh);
		
		// Line
		// const points = [];
		// points.push( new THREE.Vector3( - 10, 0, 0 ) );
		// points.push( new THREE.Vector3( 0, 10, 0 ) );
		// points.push( new THREE.Vector3( 10, 0, 0 ) );
		// const geometry = new THREE.BufferGeometry().setFromPoints( points );
		// const material = new THREE.MeshBasicMaterial( { color: 0xfb8e00  } );
		// const line = new THREE.Line( geometry, material );
		// scene.add(line);
		
		// Text
		// const geometry = new THREE.TextGeometry( text, parameters );
		
		
		
		
		
		// Render
		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );
		
		// Framework
		function animate()
		{
			requestAnimationFrame( animate );
		
			mesh.rotation.x += 0.01;
			mesh.rotation.y += 0.01;
		
			renderer.render( scene, camera );
		};
		
		animate();
	}

};
