function init(){ 
    const color1 = "Turquoise"
    const color2 = "purple"
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

    // Create a 3d Box^^
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );

    // Create a color material 
    // const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );

    // Create a color gradient material
    var material = new THREE.ShaderMaterial(getColorGradientParam(geometry, color1, color2, 2));
    
    // Create cube by combining geometry with material and add it to the scene
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    // Adjust camera position to make the object visable
    camera.position.z = 5;

    const animate = () => {

        // Change x and y position of the camera to create the rotation effect
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.02;
    
        // Render the scene according to the camera settings
        renderer.render(scene, camera)
    
        // Set up endless repetition/ loop
        requestAnimationFrame(animate)
    }

    // Call function to rotate the cube in a loop
    animate()

}

function getColorGradientParam(geometry, color1 = "purple", color2 = "red", gradientOption = 1) {
    // Color gradient code from: https://stackoverflow.com/questions/52614371/apply-color-gradient-to-material-on-mesh-three-js/52615186#52615186
    var param = {}
    const gradientFragmentShader = `
       uniform vec3 color1;
        uniform vec3 color2;

        varying vec2 vUv;
        
        void main() {
        
        gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
        }
        `

    if (gradientOption == 1) {
        var gradientVertexShader =  `
        varying vec2 vUv;
            
        void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
        `
        param = {
            uniforms: {
                color1: {
                value: new THREE.Color(color1)
                },
                color2: {
                value: new THREE.Color(color2)
                }
            },
            vertexShader:gradientVertexShader,
            fragmentShader: gradientFragmentShader,
            wireframe: false
            }
    } else if (gradientOption == 2) {
        var gradientVertexShader =  `
        uniform vec3 bboxMin;
        uniform vec3 bboxMax;

        varying vec2 vUv;

        void main() {
        vUv.y = (position.y - bboxMin.y) / (bboxMax.y - bboxMin.y);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
        `
        geometry.computeBoundingBox();    
        param = {
            uniforms: {
                color1: {
                value: new THREE.Color(color1)
                },
                color2: {
                value: new THREE.Color(color2)
                },
                bboxMin: {
                value: geometry.boundingBox.min
                },
                bboxMax: {
                value: geometry.boundingBox.max
                }
            },
            vertexShader: gradientVertexShader,
            fragmentShader: gradientFragmentShader,
            wireframe: false
            }
    }

    return param

}

window.addEventListener("load", init)
