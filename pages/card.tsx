import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { VisibilitySharp } from '@mui/icons-material';

const VideoCard = (snippet: any) => {
    const Url = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id=" + snippet.snippet.id.videoId + "&key=AIzaSyAxd5S2TAk2vhoQdhzSZqKDNTv_ok_-yos";

    const { isLoading, error, data } = useQuery('statData', () =>
        fetch(Url).then(res =>
            res.json().then(data => data.items),
        )
    )

    if (isLoading) return <h1>'Loading...'</h1>;

    if (error) return (<>An error has occurred: {error}</>);


    return (
        <Card raised sx={{ maxWidth: 345, maxHeight: 375, }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    width="200"
                    height="200"
                    image={snippet.snippet.snippet.thumbnails.high.url}
                    alt="green iguana"
                />
                <CardContent sx={{ fontSize: 10 }}>
                    <Typography gutterBottom variant="body1" component="div">
                        {snippet.snippet.snippet.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {snippet.snippet.snippet.channelTitle}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions >
                <Button size="small" sx={{ color: "gray" }}><VisibilitySharp ></VisibilitySharp>&nbsp;{data.viewCount}</Button>
                <Button size="small" sx={{ color: "gray" }}><ChatBubbleIcon></ChatBubbleIcon>&nbsp;{data.commentCount}</Button>
            </CardActions>

        </Card >

    );
}

export default VideoCard;