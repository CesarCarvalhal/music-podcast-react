import React from 'react'
import { PodcastDetails } from '../components/PodcastDetails'
import { PodcastEpisodes } from '../components/PodcastEpisodes'

export const DetailsPagePodcast = () => {
    return (
        <div className="details-page-container">
            <div className="left-column">
                <PodcastDetails />
            </div>
            <div className="right-column">
                <PodcastEpisodes />
            </div>
        </div>
    )
}
