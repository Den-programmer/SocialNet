import postSearchService from "../services/post-search.service.js";
import { StandartRes, catchRes } from "../../routes/responses/responses.js";


class SearchController {

    async posts(req, res) {

        try {

            const {
                query,
                limit
            } = req.query;


            if (!query?.trim()) {
                return res.status(400).json(
                    new StandartRes(
                        1,
                        "Query is required"
                    )
                )
            }


            const posts =
                await postSearchService.searchPosts({
                    query,
                    limit
                })


            return res.json(
                new StandartRes(
                    0,
                    "",
                    posts
                )
            )


        } catch(error) {

            console.error(error)

            return res.status(500).json(catchRes)
        }
    }
}


export default new SearchController()