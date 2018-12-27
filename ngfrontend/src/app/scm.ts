/**
 * Created by devbinu on 30/06/18.
 */

export class Scm {
    id: number;
    created_at: Date;
    duration: number;
    status: string;
    activity:string;
    resource: string;
    role:string;
    activitystep:number;
    activitysub:number;
    activitystepcycle:number;
    selected:boolean;
}

export class ScmCounterMain {
    open: number;
    completedOnTime: number;
    completedLate: number;
    openOnTime: number;
    openLate: number;
    openTooLate: number;

}
