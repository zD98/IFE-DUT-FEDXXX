##Flickr:
	
	containerWidth:设置容器宽度
	padding :设置容器padding
	boxSpacing:设置item间隔
	targetRowHeight:设置基础行高
	targetRowHeightTolerance:设置行高可变化范围

	猜想:Flickr 在一行中添加图片时：检查下一张图片的比例,即当前比例+img的比例,计算行高是否在可以变化的范围内,
		如果在的话 添加图片,这一行重新计算行高与图片大小
		如果不在的话 取消添加这张,这一行添加完毕,图片做为下一行的第一张
			会不会出现一种情况,添加了一张图片,高度小于可接受范围,添加一张后高度大于可接受范围

##ZdAlbum
	
	1.0.0
		每一行照片个数:random
		由比例计算当前行高:lineHeight
		根据lineHeight,计算每张图片宽度
	BUG:
		随机的数量不一定,导致图片失真,行高不一定确认

	2.0.0
		按照Flickr猜想尝试
