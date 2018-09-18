import { Function, IPosition, ISize, ITime } from './types';

/**
 * Clears the entire canvas with a given color
 * @param canvas The canvas to fill
 * @param color The CSS color string to fill the canvas with
 */
export function clear(canvas: HTMLCanvasElement, color: string): void {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Creates an ellipse that is animated over time
 * @param canvas The canvas to draw the ellipse on
 * @param color The color of the ellipse, given the time
 * @param size The size of the ellipse, given the time
 * @param position The position of the ellipse, given the time
 * @returns Function that accepts the current point in time and draws the ellipse
 */
export function animatedEllipse(
    canvas: HTMLCanvasElement,
    color: Function<ITime, string>,
    size: Function<ITime, ISize>,
    position: Function<ITime, IPosition>,
): Function<ITime, void> {
    const ctx = canvas.getContext('2d');
    return (t) => {
        const c = color(t);
        const pos = position(t);
        const radii = size(t);
        if (ctx.ellipse) {
            ctx.beginPath();
            ctx.ellipse(pos.x, pos.y, radii.width, radii.height, 0, 0, 2 * Math.PI);
            ctx.strokeStyle = c;
            ctx.lineWidth = 2;
            ctx.stroke();
        } else {
            // Backup if Ellipse function is not provided (IE)
            ctx.save();
            ctx.beginPath();
            ctx.setTransform(1, 0, 0, radii.height / radii.width, pos.x, pos.y);
            ctx.arc(0, 0, radii.width, 0, 2 * Math.PI);
            ctx.strokeStyle = c;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();
        }
    };
}
