import { GetStaticPropsContext, NextPage } from "next";
import Link from "next/link";
import Showdown from "showdown";
import GoSimulate from "../../components/buttons/goSimulate";
import HeadSeo, { defaultMeta } from "../../components/seo/Head";
import { Article } from "../../interfaces/article.interface";
import { ArticlesService } from "../../services/articles.service";

interface Props {
	article: Article;
}

export const Index: NextPage<Props> = ({ article }) => {
	const converter = new Showdown.Converter();

	return (
		<div className="container">
			<HeadSeo
				meta={{
					...defaultMeta,
					title: article.title,
					description: article.description,
					image: article.image,
					url: `${defaultMeta.url}/articles/${article.slug}`,
				}}
			/>
			<div className="flex justify-end">
				<Link href='/' passHref>
					<u>go to home</u>
				</Link>
			</div>
			<div className="flex center m3">
				<GoSimulate text="Go Simulation" name={article.slug} />
			</div>

			<div
				dangerouslySetInnerHTML={{
					__html: converter.makeHtml(article.content as string),
				}}
			/>
		</div>
	);
};

export default Index;

export const getStaticPaths = async () => {
	const articles = await ArticlesService.getArticles();
	try {
		const paths = articles.map((article: any) => ({
			params: { slug: article.slug },
		}));

		return {
			paths: paths,
			fallback: "blocking",
		};
	} catch (error) {
		return { paths: [], fallback: "blocking" };
	}
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
	const slug = context.params?.slug;
	const article = await ArticlesService.getArticleBySlug(slug as string);
	console.log(article);
	if (!article) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			article: article,
		},
		revalidate: 300,
	};
};