module.exports = app => {
	const jwt = require('jsonwebtoken')
	const assert = require('http-assert')
	const router = require('express').Router()
	const mongoose = require('mongoose')

	const Category = mongoose.model('Category')
	const Article = mongoose.model('Article')
	const Ad = mongoose.model('Ad')

	// 录入数据
	router.get('/news/init', async (req, res) => {
		const parent = await Category.findOne({
			name: '新闻分类'
		})
		const cats = await Category.find().where({
			parent: parent // 指定查询分类
		}).lean()
		const newsTitle = ['YOLOv5全面解析教程②：如何制作训练效果更好的数据集', 'ChatGPT进化的秘密', '对比PyTorch、TensorFlow、JAX、Theano，我发现都在关注两大问题', 'DevEco Studio 3.1差异化构建打包，提升多版本应用开发效率', 'OpenAI掌门人Sam Altman：AI的下一个发展阶段', 'YOLOv5全面解析教程①：网络结构逐行代码解读', '下载量突破10亿，MinIO的开源启示录', '在搭载 M1 及 M2 芯片 MacBook 设备上玩 Stable Diffusion 模型', '关于ChatGPT的一切；CUDA入门之矩阵乘；PyTorch 2.0发布｜AI系统前沿动态', '用一张图说一说 ChatGPT 内部技术工作流程', '一块RTX 3090加速训练YOLOv5s，时间减少11个小时，速度提升20%', '全面进化！Apache Doris 1.2.0 Release 版本正式发布｜版本通告', '刷新AI作图速度，最快的开源Stable Diffusion出炉', 'YOLOv5全面解析教程①：网络结构逐行代码解析', 'Stable Diffusion 2.0 来了', 'OneFlow源码解析：自动微分机制', 'Stable Diffusion半秒出图；VLIW的前世今生；YOLOv5全面解析教程 | AI系统前沿动态', '实现资源利用率达60% 云原生技术开启节能减排新思路', '开源风暴吞噬AI界？从Stable Diffusion的爆火说起', '昆仑万维旗下StarMaker VR成功加入Oculus开发者计划 获Oculus资金支持', 'OneFlow-ONNX v0.6.0正式发布', '大模型狂潮背后：AI基础设施的“老化”与改造工程', '李白：你的模型权重很不错，可惜被我没收了', 'Compose Material 3 稳定版现已发布 | 2022 Android 开发者峰会', 'Android Jetpack之LiveData源码分析', '进 4 球得 1 分，阿根廷败北背后的科技与狠活', '万亿数据秒级响应，Apache Doris 在360 数科实时数仓中的应用', '【腾讯云原生】Eunomia云原生资源编排优化', '安卓APP全局黑白化实现方案', '打造高安全数字基础设施：中国电子云服务关键行业的宣言', 'Moka发布“人才数字经济”四大趋势：数智化是关键', '为“扫清”采用障碍，Oracle 计划将 GraalVM 社区版源代码贡献给 OpenJDK', 'OPPO广告联盟战略升级，全面提升开发者变现效率', '首个中文Stable Diffusion模型开源；TPU演进十年；18个PyTorch性能优化技巧 | AI系统前沿动态...', '注解处理器（APT）是什么？', '华为携手去哪儿、九牧等企业，共论鸿蒙生态发展蓝图', '华为开发者大会2022，发布鸿蒙开发套件', '机器学习编译器的前世今生', '一个更快的YOLOv5问世，附送全面中文解析教程']
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

	// 用户文章信息
	router.post('/rest/articles', async (req, res) => {
		const model = await Article.create(req.body)
		res.send(model)
	})

	router.get('/rest/articles', async (req, res) => {
		const queryOptions = {}
		// if (req.Model.modelName === 'Category') {
		// 	queryOptions.populate = 'parent'
		// }
		const items = await Article.find().setOptions(queryOptions).limit(150)
		res.send(items)
	})

	// 新闻接口
	router.get('/news/list', async (req, res) => {
		// 查找分类为 -> 新闻分类
		const parent = await Category.findOne({
			name: '新闻分类'
		})
		// 聚合查询
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
		const subCats = cats.map(v => v._id)
		cats.unshift({
			name: '热门',
			// 查询文章内容
			newsList: await Article.find().where({
				categories: { $in: subCats }
			}).populate('categories').limit(5).lean()
		})
		cats.map(cat => {
			cat.newsList.map(news => {
				news.categoryName = (cat.name === '热门') ? news.categories[0].name : cat.name
				return news
			})
			return cat
		})
		res.send(cats)
	})

	// 文章详情
	router.get('/articles/:id', async (req, res) => {
		const model = await Article.findById(req.params.id).lean()
		model.related = await Article.find().where({
			categories: { $in: model.categories }
		}).limit(2)
		res.send(model)
	})


	router.get('/swiper', async (req, res) => {
		const model = await Ad.find({}).where({
			name: '首页轮播图'
		})
		res.send(model[0])
	})

	const AdminUser = mongoose.model('AdminUser')
	// 登录接口
	router.post('/login', async (req, res, next) => {
		const { username, password } = req.body
		// 用户名等信息写入session
		req.session.username = username
		try {
			// 1. 用户校验 
			const user = await AdminUser.findOne({ username }).select('+password')
			assert(user, 422, '用户不存在！')
			// 2. 密码校验
			const isValid = require('bcrypt').compareSync(password, user.password)
			assert(isValid, 422, '密码错误！')
			// 3. 生成token - 登录凭证
			const rules = {
				id: user._id
			} 
			const token = jwt.sign(rules, app.get('secret'))

			res.status(200).send({ message: '登录成功', token })
		} catch (err) {
			next(err)
		}
	})

	app.use('/web/api', router)

	// 错误处理函数
	app.use((err, req, res, next) => {
		return res.status(err.statusCode || 500).send({
			message: err.message
		})
	})
}