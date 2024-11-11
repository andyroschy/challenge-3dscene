const MAX_FRAMES = 50;
// cahce frames in memroy -  array instead of map since frames are consecutive numbers 
const frames: (Frame | undefined)[] = Array(MAX_FRAMES);

// On a production app this would be an environment variable, of course. 
const frameUri = (n: number) => `https://static.scale.com/uploads/pandaset-challenge/frame_${n.toString().padStart(2,'0')}.json`;

/**
 * 
 * @param n Frame number, must be between 0 and 50
 * @returns A promise that resolves to the specified frame of the scene
 */
export const getFrame = async (n: number): Promise<Frame> => {
    if (n < 0 || n > MAX_FRAMES ) { throw new Error('Invalid frame'); }

    if (frames[n]) { return frames[n]; }

    const response = await fetch(frameUri(n));
    if (response.status < 200 || response.status >= 299) { throw new Error('There was an error fetching the frame '); } 

    const rawResponse: any = await response.json();
    
    return { 
        frameId: rawResponse.frame_id,
        points: rawResponse.points,
        cuboids: rawResponse.cuboids.map((cuboid: any) => ({
            cameraUsed: cuboid.camera_used,
            dimensions: {
                x: cuboid['dimensions.x'],
                y: cuboid['dimensions.y'],
                z: cuboid['dimensions.z']
            },
            position: {
                x: cuboid['position.x'],
                y: cuboid['position.y'],
                z: cuboid['position.z']
            },
            sensorId: cuboid['cuboids.sensor_id'],
            siblingId: cuboid['cuboids.sibling_id'],
            label: cuboid.label,
            stationary: cuboid.stationary,
            uuid: cuboid.uuid,
            yaw: cuboid.yaw,
        }) as Cuboid)
    } as Frame;
}


export type Point = [number, number, number];

export interface Cuboid {
    uuid: string;
    label: string;	
    yaw: number;
    stationary: boolean;
    cameraUsed: number;
    position: Coordinate3D;    
    dimensions: Dimension3D;
    siblingId: string;
    sensorId: string;
}

export interface Coordinate3D {
    x: number;
    y: number;
    z: number;
}

// The shape of a Dimension value is the same as a Coordinate value, but they represent different things hence the type alias
// This is just for clarity for developers, Typescript has implicitly declared interface implementation, so if the types have the same shape they are interchangable anyway
export type Dimension3D = Coordinate3D; 

export interface Frame {
    frameId: number;
    cuboids: Point[];
    points: Cuboid[]
}