const linkedinPattern = /^https:\/\/www\.linkedin\.com\/in\/\S+\//;
const githubPattern = /^https:\/\/www\.gihub\.com\/\S+/;
const instagramPattern = /^https:\/\/www\.instagram\.com\/\S+\//;
const facebokPattern = /^https:\/\/www\.facebook\.com\/profile\.php\?\S+\//;
const phonePattern = /^\+?(?:[0-9]){6,14}[0-9]$/;
class LinksValidators {
    pattern;
    message;
    constructor(pattern, name) {
        this.pattern = pattern;
        this.message = `invalid ${name} uri`;
    }
    init = () => (value, helpers) => !value.match(this.pattern) ? helpers.error('any.custom', { message: this.message }) : value;
}
export const isLinkedinLink = new LinksValidators(linkedinPattern, 'linkedin').init();
export const isFacebookLink = new LinksValidators(facebokPattern, 'facebook').init();
export const isInstagramLink = new LinksValidators(instagramPattern, 'instagram').init();
export const isPhoneLink = new LinksValidators(phonePattern, 'phone').init();
export const isGithubLink = new LinksValidators(githubPattern, 'github').init();
