export default function DateDisplay({ isoDate }) {
    const date = new Date(isoDate);
    return (
        <span>
            {date.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            })}
        </span>
    );
}
