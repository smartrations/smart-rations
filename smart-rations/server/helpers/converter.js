import { Feed } from "../models/FeedModel";
import { UserFeed } from "../models/UserFeedModel";

async function UserFeedToSystemFeed(userFeed) {
    const feed = await Feed.findOne({ _id: userFeed.FeedID ?? userFeed })
    feed.DMFed = userFeed.DMFed
    feed.Price = userFeed.Price
    return feed
}

async function GetFeedsByUserID(userID) {
    const uFeeds = await UserFeed.find({ UserID: userID })
    const feeds = await Feed.find({ UserID: userID })

    const userFeeds = await Feed.find({ UserID: userID })

    uFeeds.forEach(f => {
        const find = feeds.find(a => a._id == f._id)
        if (find) {
            find.DMFed = _feed.DMFed
            find.Price = _feed.Price
        }
    })

    return [...userFeeds, ...feeds]
}
