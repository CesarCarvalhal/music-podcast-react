import React from 'react'
import { PodcastDetails } from '../components/PodcastDetails'
import { EpisodesDetail } from '../components/EpisodesDetail'

export const DetailsPageEpisodes = () => {
    return (
        <div className="details-page-container">
            <div className="left-column">
                <PodcastDetails />
            </div>
            <div className="right-column">
                <EpisodesDetail />
            </div>
        </div>
    )
}
