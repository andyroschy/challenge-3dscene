const MAX_FRAMES = 50;

// cahce frames in memroy
const frames: (Frame | undefined)[] = Array(MAX_FRAMES);

// On a production app this would be an environment variable, of course. 
const frameUri = (n: number) => `https://static.scale.com/uploads/pandaset-challenge/frame_${n.toString().padStart(2, '0')}.json`;

/**
 * 
 * @param n Frame number, must be between 0 and 50
 * @returns A promise that resolves to the specified frame of the scene
 */
export const getFrame = async (n: number): Promise<Frame> => {
    if (n < 0 || n > MAX_FRAMES) { throw new Error('Invalid frame'); }

    if (frames[n]) { return Promise.resolve(frames[n]); }

    const response = await fetch(frameUri(n));
    if (response.status < 200 || response.status >= 299) { throw new Error('There was an error fetching the frame '); }

    const rawResponse: any = await response.json();

    // NOTE: coordinates axis in the payload seemed to be scrambled based on YAW being Y axis, and the default behavior of camera controls
    const frame = {
        frameId: rawResponse.frame_id,
        points: rawResponse.points.map((x: Point) => [x[1], x[2], x[0]]),
        cuboids: rawResponse.cuboids.map((cuboid: any) => ({
            cameraUsed: cuboid.camera_used,
            dimensions: {
                x: cuboid['dimensions.y'],
                y: cuboid['dimensions.z'],
                z: cuboid['dimensions.x']
            },
            position: {
                x: cuboid['position.y'],
                y: cuboid['position.z'],
                z: cuboid['position.x']
            },
            sensorId: cuboid['cuboids.sensor_id'],
            siblingId: cuboid['cuboids.sibling_id'],
            label: cuboid.label,
            stationary: cuboid.stationary,
            uuid: cuboid.uuid,
            yaw: cuboid.yaw,
        }) as Cuboid)
    } as Frame;

    // frames[n] = frame;
    return frame;
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
    cuboids: Cuboid[];
    points: Point[]
}