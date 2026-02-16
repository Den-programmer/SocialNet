export type FieldValidator = (value: string) => string | undefined

export const required: FieldValidator = (value) => {
    if (value) {
        return undefined;
    } else {
        return "Field is required!"
    }
}

export const maxLengthCreator = (countSymbols: number): FieldValidator => (value) => {
    if (value && value.length > countSymbols) {
        return `Max length is ${countSymbols}`;
    } else {
        return undefined;
    }
}

export const minLengthCreator = (countSymbols: number): FieldValidator => (value) => {
    if (value && value.length < countSymbols) {
        return "Min length is " + countSymbols;
    } else {
        return undefined;
    }
}
export const enteredNothingError: FieldValidator = (val) => {
    if (!val) return "You entered nothing!"

    return undefined;
}

const createSocialValidator = (
    regex: RegExp,
    error: string,
    platformName: string
): FieldValidator => value => {
    if (!value) return undefined

    const normalized = value.trim()
    
    // Check length to prevent DoS
    if (normalized.length > 2048) {
        return `${platformName} URL is too long (max 2048 characters)`
    }

    // Check for suspicious characters that could indicate XSS attempts
    if (/[<>"'`]/g.test(normalized)) {
        return `${platformName} URL contains invalid characters`
    }

    if (!regex.test(normalized)) {
        return error
    }

    return undefined
}

const facebookRegex =
    /^https?:\/\/(?:www\.|m\.)?(?:facebook|fb)\.com\/(?:profile\.php\?id=\d+|[A-Za-z0-9.\-]+)\/?$/i

const twitterRegex =
    /^https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/[A-Za-z0-9_]{1,15}\/?$/i

const linkedinRegex =
    /^https?:\/\/(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9\-_%]+\/?$/i

const githubRegex =
    /^https?:\/\/(?:www\.)?github\.com\/[A-Za-z0-9\-]+\/?$/i

const instagramRegex =
    /^https?:\/\/(?:www\.)?instagram\.com\/[A-Za-z0-9._]+\/?$/i

const youtubeRegex =
    /^https?:\/\/(?:www\.)?youtube\.com\/(?:@[\w\-]+|c\/[\w\-]+|channel\/[\w\-]+|user\/[\w\-]+)\/?$/i

export const facebookLinkValidator = createSocialValidator(
    facebookRegex,
    'Enter a valid Facebook profile URL!',
    'Facebook'
)

export const twitterLinkValidator = createSocialValidator(
    twitterRegex,
    'Enter a valid Twitter/X profile URL!',
    'Twitter'
)

export const linkedinLinkValidator = createSocialValidator(
    linkedinRegex,
    'Enter a valid LinkedIn profile URL!',
    'LinkedIn'
)

export const githubLinkValidator = createSocialValidator(
    githubRegex,
    'Enter a valid GitHub profile URL!',
    'GitHub'
)

export const instagramLinkValidator = createSocialValidator(
    instagramRegex,
    'Enter a valid Instagram profile URL!',
    'Instagram'
)

export const youtubeLinkValidator = createSocialValidator(
    youtubeRegex,
    'Enter a valid YouTube channel URL!',
    'YouTube'
)

export const socialsValidatorsMap = {
    facebook: facebookLinkValidator,
    twitter: twitterLinkValidator,
    linkedin: linkedinLinkValidator,
    github: githubLinkValidator,
    instagram: instagramLinkValidator,
    youtube: youtubeLinkValidator
} as const

export const PLATFORM_HINTS: Record<string, string> = {
  facebook: 'example: https://facebook.com/yourprofile',
  twitter: 'example: https://twitter.com/yourhandle',
  instagram: 'example: https://instagram.com/yourprofile',
  youtube: 'example: https://youtube.com/@yourchannel',
  github: 'example: https://github.com/yourprofile',
  linkedin: 'example: https://linkedin.com/in/yourprofile'
}

export const sanitizeUrl = (input?: string): string | null => {
    if (!input) return null

    try {
        let value = input.trim()

        // Reject extremely long strings to prevent DoS
        if (value.length > 2048) return null

        // Reject if contains suspicious characters
        if (/[<>"'`]/g.test(value)) return null

        if (!/^https?:\/\//i.test(value)) {
            value = `https://${value}`
        }

        const url = new URL(value)

        // Only allow http and https protocols
        if (!['http:', 'https:'].includes(url.protocol)) return null

        // Remove hash and search params to ensure clean URL
        url.hash = ''
        url.search = ''
        
        const sanitized = url.toString()
        
        // Final validation - ensure it's still a valid URL
        new URL(sanitized)
        
        return sanitized
    } catch {
        return null
    }
}


export const runValidators = (
    value: string,
    validators: FieldValidator[]
): string | undefined => {
    for (const validate of validators) {
        const error = validate(value)
        if (error) return error
    }
    return undefined
}