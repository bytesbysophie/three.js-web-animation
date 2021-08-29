function init(){ 
    const color2 = "#841b9e"
    const color1 = "#007690"
    const scene = new THREE.Scene();

    // Create the cammera 
    const camera = new THREE.PerspectiveCamera(
        fov = 75, // vertical field of view
        aspect = window.innerWidth/ window.innerHeight, //  aspect ratio
        near = 0.1, // near plane
        far = 1000 // far plane
    );
    
    // Create the renderer with antialias to ensure smooth borders of the rendered objects
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    // Create a 3d torus
    const geometry = new THREE.TorusGeometry(2, 1, 50, 200);
    const sceneGeometry = new THREE.BoxGeometry( 500, 500, 1000);

    // Create a color material 
    const material = new THREE.MeshPhongMaterial( {color: color2, shininess: 30} );
    const sceneMaterial = new THREE.MeshPhongMaterial( {color: color1} );
    sceneMaterial.side = THREE.BackSide; 

    // Create torus by combining its geometry with material and add it to the scene
    const torus = new THREE.Mesh( geometry, material );
    torus.castShadow = true; //default is false
    scene.add( torus );

    const sceneBox = new THREE.Mesh(sceneGeometry, sceneMaterial);
    sceneBox.receiveShadow = true; //default
    scene.add( sceneBox );

    // Create light and add it to the scene
    const lightFront = new THREE.DirectionalLight( "white", 0.3);
    lightFront.position.set(0, 0, 2)
    scene.add( lightFront );

    const lightTop = new THREE.DirectionalLight(color1, 1);
    lightTop.position.set(-50, 100, 0)
    scene.add( lightTop );

    const lightBottom = new THREE.DirectionalLight(color1, 0.7);
    lightBottom.position.set(50, -40, 100)
    scene.add( lightBottom );

    const lightAmbient = new THREE.AmbientLight("white")
    scene.add( lightAmbient );

    // Adjust camera position to make the object visable
    camera.position.z = 10;
    torus.rotation.y = 10;


    const animate = () => {

        // Change x and y position of the camera to create the rotation effect
        // torus.rotation.y += 0.02;
        torus.rotation.x += 0.03;

        // Render the scene according to the camera settings
        renderer.render(scene, camera)
    
        // Set up endless repetition/ loop
        requestAnimationFrame(animate)
    }

    // Call function to rotate the cube in a loop
    animate()

}

window.addEventListener("load", init)
