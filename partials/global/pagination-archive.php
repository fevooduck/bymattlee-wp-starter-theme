<?php if ( get_next_posts_link() || get_previous_posts_link() ) : ?>
  <div class="c-archivePagination">

    <?php if ( get_previous_posts_link() ) : ?>
      <a href="<?php echo get_previous_posts_page_link(); ?>" class="c-archivePagination-item"><?php _e( '&laquo; Previous Page', 'bymattlee' ); ?></a>
    <?php endif; ?>

    <?php if ( get_next_posts_link() ) : ?>
      <a href="<?php echo get_next_posts_page_link(); ?>" class="c-archivePagination-item"><?php _e( 'Next Page &raquo;', 'bymattlee' ); ?></a>
    <?php endif; ?>

  </div>
<?php endif; ?>