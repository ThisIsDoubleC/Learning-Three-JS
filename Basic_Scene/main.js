
//create scene, camera, renderer
    const scene = new THREE.Scene(); //space
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); //view into that space

    const renderer = new THREE.WebGLRenderer(); //showing the view of that space
    renderer.setSize( window.innerWidth, window.innerHeight ); //resolution (using optional updateStyle parameter) and how much of the window will we use in the window
    document.body.appendChild( renderer.domElement ); //put renderer into html code

//create geometry to view
    const geometry = new THREE.BoxGeometry(); //creates a cube by describing the vertices (points) and faces (fill) of the cube geometry
    const material = new THREE.MeshBasicMaterial( { color: 'rgb(250,250,200)' } ); //add material with only the property of color using Hex codes
    const lightReactiveMaterial = new THREE.MeshPhongMaterial({shininess: 100});
    const cube = new THREE.Mesh( geometry, lightReactiveMaterial ); //Mesh takes geometry and applies a material onto it. 
    scene.add( cube ); //We can insert this mesh into our scene and move it around. By default it is added to coordinates (0,0,0)

    camera.position.z = 5; //move camera position away from default position of (0,0,0)

//Add lights
    const lights = [];
    lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
     lights[ 2 ] = new THREE.PointLight( 0xffffff, 0.5, 0 );
    lights[ 1 ] = new THREE.PointLight( 0xffffff, 0.9, 0 );
    //ambient lighting
    lights.push(new THREE.AmbientLight(('rgb(10,15,90)'),0.5)) //color, intensity

    lights[ 0 ].position.set( 0, 200, 0 );
     lights[ 1 ].position.set( 100, 200, 100 );
    lights[ 2 ].position.set( - 100, - 200, - 100 );
 
    for (let light of lights){
        scene.add(light)
    }

// Controls

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.minDistance = 1;
    controls.maxDistance = 8;
    controls.target.set( 0, 1, 0 );
    controls.update();

//GUI
const gui = new GUI();
gui.add( document, 'title' ); //Control webpage title (https://lil-gui.georgealways.com/#Guide#Adding-Controllers)

function updateGeometries(mesh, updatedGeometry){ 
    //Based on function from view-source:https://threejs.org/docs/scenes/geometry-browser.html#BoxGeometry
    mesh.geometry.dispose(); //uses properties of mesh from inherited from Object3D https://threejs.org/docs/?q=mesh#api/en/core/Object3D.children

    mesh.geometry = updatedGeometry
}

function updatePosition(mesh,positionX,positionY){
    mesh.position.set(positionX,positionY,0) //Inherited from Object3D https://threejs.org/docs/?q=mesh#api/en/core/Object3D.position
}

function generateGeometry (){
    updateGeometries(cube,new THREE.BoxGeometry(
        dataGuiVariables.width, dataGuiVariables.height
    )); 
    updatePosition(cube,dataGuiVariables.positionX,dataGuiVariables.positionY)
}

const geometryGUI = gui.addFolder('Geometry Control');
    //Variables used in GUI
        dataGuiVariables = {
            width: 1, height: 1,positionX: 0,positionY:0
        }
    geometryGUI.add(dataGuiVariables, 'width', 1,25 /*Min, Max, (optional) Step size*/).onChange(generateGeometry) 
    geometryGUI.add(dataGuiVariables, 'height', 1,25 /*Min, Max, (optional) Step size*/).onChange(generateGeometry)
    geometryGUI.add(dataGuiVariables, 'positionX', -4,4 /*Min, Max, (optional) Step size*/).onChange(generateGeometry)
    geometryGUI.add(dataGuiVariables, 'positionY', -4,4 /*Min, Max, (optional) Step size*/).onChange(generateGeometry)



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


