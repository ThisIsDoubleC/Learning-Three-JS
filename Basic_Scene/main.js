//create scene, camera, renderer
    const scene = new THREE.Scene(); //space
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); //view into that space

    const renderer = new THREE.WebGLRenderer(); //showing the view of that space
    renderer.setSize( window.innerWidth, window.innerHeight ); //resolution (using optional updateStyle parameter) and how much of the window will we use in the window
    document.body.appendChild( renderer.domElement ); //put renderer into html code

//create geometry to view
    const geometry = new THREE.BoxGeometry(); //creates a cube by describing the vertices (points) and faces (fill) of the cube geometry
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); //add material with only the property of color using Hex codes
    const cube = new THREE.Mesh( geometry, material ); //Mesh takes geometry and applies a material onto it. 
    scene.add( cube ); //We can insert this mesh into our scene and move it around. By default it is added to coordinates (0,0,0)

    camera.position.z = 5; //move camera position away from default position of (0,0,0)

// Controls

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.minDistance = 1;
    controls.maxDistance = 8;
    controls.target.set( 0, 1, 0 );
    controls.update();

//Animate render to draw scene every time the screen is refreshed (often 60 frames per second)
    function animate() {
        requestAnimationFrame( animate ); //requestAnimationFrame (unlike javascript setInterval) pauses when user navigate to another tab saving battery and processing power
        myTestAnimation()
        renderer.render( scene, camera );
    }
animate();

function myTestAnimation(){
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}