
//create scene, camera, renderer
    const scene = new THREE.Scene(); //space
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); //view into that space

    const renderer = new THREE.WebGLRenderer({antialias:true}); //showing the view of that space
    renderer.setSize( window.innerWidth, window.innerHeight ); //resolution (using optional updateStyle parameter) and how much of the window will we use in the window
    document.body.appendChild( renderer.domElement ); //put renderer into html code

//Create Normal Map
    //https://dustinpfister.github.io/2021/06/24/threejs-normal-map/
    var createCanvasTexture = function (draw) { //create 2D texture for normal map procedurally using javascript but images work too
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 32;
        canvas.height = 32;
        draw(ctx, canvas);
        return new THREE.CanvasTexture(canvas);
    };
     
    var createNormalMap = function(){
        return createCanvasTexture(function (ctx, canvas) {
            ctx.lineWidth = 1;
            ctx.fillStyle = new THREE.Color(1.0, 1.0, 1.0).getStyle();
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = new THREE.Color(1.0, 1.0, 0.0).getStyle();
            ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
            ctx.strokeStyle = new THREE.Color(0.0, 1.0, 1.0).getStyle();
            ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
        });
    };


//create geometry to view
    const geometry = new THREE.BoxGeometry(); //creates a cube by describing the vertices (points) and faces (fill) of the cube geometry
    //Basic material
        const material = new THREE.MeshBasicMaterial( { color: 'rgb(250,250,200)' } ); //add material with only the property of color using Hex codes
    //Testing Light reactive materials
        const lightReactiveMaterialWithProcedurallyGeneratedNormal = new THREE.MeshPhongMaterial({shininess: 100, normalMap: createNormalMap()});
        const textureLoader = new THREE.TextureLoader();
        const normalTexture = textureLoader.load("NormalMap.png") //Normal map generated by https://cpetry.github.io/NormalMap-Online/
        const lightReactiveMaterialWithNormalTexture =  new THREE.MeshPhongMaterial({shininess: 100, normalMap: normalTexture});
    const cube = new THREE.Mesh( geometry, lightReactiveMaterialWithNormalTexture ); //Mesh takes geometry and applies a material onto it. 
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
            width: 1, height: 1,positionX: 0,positionY:0,rotationSpeed:0.01
        }
    geometryGUI.add(dataGuiVariables, 'width', 1,25 /*Min, Max, (optional) Step size*/).onChange(generateGeometry) 
    geometryGUI.add(dataGuiVariables, 'height', 1,25 /*Min, Max, (optional) Step size*/).onChange(generateGeometry)
    geometryGUI.add(dataGuiVariables, 'positionX', -4,4 /*Min, Max, (optional) Step size*/).onChange(generateGeometry)
    geometryGUI.add(dataGuiVariables, 'positionY', -4,4 /*Min, Max, (optional) Step size*/).onChange(generateGeometry)
    geometryGUI.add(dataGuiVariables, 'rotationSpeed', -0.1,0.1 /*Min, Max, (optional) Step size*/)



//Animate render to draw scene every time the screen is refreshed (often 60 frames per second)
    function animate() {
        requestAnimationFrame( animate ); //requestAnimationFrame (unlike javascript setInterval) pauses when user navigate to another tab saving battery and processing power
        myTestAnimation()
        renderer.render( scene, camera );
    }
animate();

function myTestAnimation(){
    cube.rotation.x += dataGuiVariables.rotationSpeed;
    cube.rotation.y += dataGuiVariables.rotationSpeed;
}


