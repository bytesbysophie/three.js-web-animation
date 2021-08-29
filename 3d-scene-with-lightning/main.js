function init(){ 
    const color1 = "Turquoise"
    const color2 = "purple"
    const backgroundColor = "#191b1c"
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor)

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

    // Create a color material 
    const material = new THREE.MeshPhongMaterial( {color: color2, shininess: 10} );

    // Create torus by combining its geometry with material and add it to the scene
    const torus = new THREE.Mesh( geometry, material );
    torus.castShadow = true; //default is false

    scene.add( torus );

    // Create light and add it to the scene
    const lightFront = new THREE.DirectionalLight( "white", 0.5 );
    lightFront.position.set(0, 50, 300)
    scene.add( lightFront );

    const lightTop = new THREE.DirectionalLight("white", 0.5 );
    lightTop.position.set(0, 400, 40)
    scene.add( lightTop );

    const lightAmbient = new THREE.AmbientLight(color1)
    scene.add( lightAmbient );

    // Adjust camera position to make the object visable
    camera.position.z = 7;

    const animate = () => {

        // Change x and y position of the camera to create the rotation effect
        torus.rotation.y += 0.01;
    
        // Render the scene according to the camera settings
        renderer.render(scene, camera)
    
        // Set up endless repetition/ loop
        requestAnimationFrame(animate)
    }

    // Call function to rotate the cube in a loop
    animate()

}

window.addEventListener("load", init)
