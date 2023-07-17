
export function DetailsHeader({ story }) {


    return (
        <div className="details-header">
            <h2> {story.name}</h2>
            <p>
                <span> ⭐ reviews </span>
                <span> {story.loc.country}, {story.loc.city}</span>
            </p>

        </div>
    )
}