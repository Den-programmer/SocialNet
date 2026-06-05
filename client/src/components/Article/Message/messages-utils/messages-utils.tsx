import { EMOJI_ROWS } from '../../../../data/options/optionsMenuData'
import classes from '../messages.module.scss'

interface IEmojiPickerContent {
    onEmojiSelect: (emoji: string) => void
}

export const EmojiPickerContent:React.FC<IEmojiPickerContent> = ({ onEmojiSelect }) => {
    return (
        <div className={classes.emojiGrid}>
            {EMOJI_ROWS.map((row, ri) => (
                <div key={ri} className={classes.emojiRow}>
                    {row.map((emoji) => (
                        <button
                            key={emoji}
                            className={classes.emojiBtn}
                            onClick={() => onEmojiSelect(emoji)}
                            type="button"
                        >
                            {emoji}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    )
}
