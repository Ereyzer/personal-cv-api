import { ONE_DAY } from '../config/constants.ts';
import { cleearExpiredTokens } from '../services/session.ts';

export const oncePerDay = () => {
  let interval: NodeJS.Timeout | null = null;
  let timeout: NodeJS.Timeout | null = null;

  if (!interval && !timeout) {
    // TODO: if i nead now in future features i can move it from {area}
    const now = new Date();
    const clearTime = new Date(0);

    clearTime.setFullYear(now.getFullYear());
    clearTime.setMonth(now.getMonth());
    clearTime.setDate(now.getDate());
    clearTime.setHours(8);
    clearTime.setMinutes(30);

    const clearTimeMiliseconds = clearTime.getTime();
    const nowMiliseconds = now.getTime();
    if (clearTimeMiliseconds > nowMiliseconds) {
      timeout = setTimeout(() => {
        cleearExpiredTokens();

        interval = setInterval(cleearExpiredTokens, ONE_DAY);
      }, clearTimeMiliseconds - nowMiliseconds);
    } else if (clearTimeMiliseconds < nowMiliseconds) {
      timeout = setTimeout(
        () => {
          cleearExpiredTokens();
          interval = setInterval(cleearExpiredTokens, ONE_DAY);
        },
        clearTimeMiliseconds + ONE_DAY - nowMiliseconds
      );
    }
  }
};
