module.exports = app => {
	const router = require('express').Router()
	const mongoose = require('mongoose')
	const Category = mongoose.model('Category')
	const Article = mongoose.model('Article')

	router.get('/news/init', async (req, res) => {
		const parent = await Category.findOne({
			name: '新闻分类'
		})
		const cats = await Category.find().where({
			parent: parent // 指定查询分类
		}).lean()
		const newsTitle = ['赛事战报丨高校联赛分站赛—东北赛区赛事回顾', '赛事战报丨高校联赛分站赛—东北赛区赛事回顾', '校园共建创意无限，第九届王者荣耀高校联赛分站赛今日开赛！', '返图时刻丨高校联赛海选赛第六周赛点现场回顾', '趣味数据丨高校联赛第六周海选赛趣味数据大赏', '赛点公布丨第九届王者荣耀高校联赛第七周海选赛点一览', '趣味数据丨高校联赛第五周海选赛趣味数据大赏', '赛点公布丨第九届王者荣耀高校联赛第六周海选赛点一览']
		const newsList = newsTitle.map(title => {
			// 随机排序后返回新的拷贝数组
			const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
			return {
				categories: randomCats.slice(0, 2),
				title: title
			}
		})
		await Article.deleteMany({})
		await Article.insertMany(newsList)
		res.send(newsList)
	})

	router.get('/news/list', async (req, res) => {
		// const parent = await Category.findOne({
		// 	name: '新闻分类'
		// }).populate({
		// 	path: 'chilren',
		// 	populate: {
		// 		path: 'newsList'
		// 	}
		// }).lean()
		const parent = await Category.findOne({
			name: '新闻分类'
		})
		const cats = await Category.aggregate([
			{ $match: { parent: parent._id } },
			{
				$lookup: {
					from: 'articles',
					localField: '_id',
					foreignField: 'categories',
					as: 'newsList'
				}
			}, {
				$addFields: {
					newsList: { $slice: ['$newsList', 5] }
				}
			}
		])
		res.send(cats)
	})

	app.use('/web/api', router)
}