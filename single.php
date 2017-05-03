<?php get_header(); ?>

<main class="l-main" role="main">

	<?php while ( have_posts() ) : the_post(); ?>

		<?php get_template_part( 'partials/single', 'content' );  ?>

		<?php the_post_pagination(); ?>

	<?php endwhile; ?>

</main>

<?php get_sidebar(); ?>

<?php get_footer(); ?>