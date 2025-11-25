export const timePassedCalc = (createdAt) =>{
    const now = new Date();
    const fromTime = new Date(createdAt).getTime();

    const diffInMms = now - fromTime;
    const diffInSec = Math.floor(diffInMms / 1000);
    const diffInMin = Math.floor(diffInSec / 60);
    const diffInHour = Math.floor(diffInMin / 60);
    const diffInDay = Math.floor(diffInHour / 24);
    const diffInMonth = Math.floor(diffInDay / 30);
    const diffInYear = Math.floor(diffInDay / 365);

    if(diffInSec < 60) return `${diffInSec} sec${diffInSec !== 1 ? "s" : ""} ago`;
    if(diffInMin < 60) return `${diffInMin} min${diffInMin !== 1 ? "s" : ""} ago`;
    if(diffInHour < 24) return `${diffInHour} hour${diffInHour !== 1 ? "s" : ""} ago`;
    if(diffInDay < 30) return `${diffInDay} day${diffInDay !== 1 ? "s" : ""} ago`;
    if(diffInMonth < 12) return `${diffInMonth} month${diffInMonth !== 1 ? "s" : ""} ago`;
    return `${diffInYear} year${diffInYear !== 1 ? "s" : ""} ago`;
}