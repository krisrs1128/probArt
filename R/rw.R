#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
rw <- function(nx = 20, ny = 20, t = 50, width = NULL, height = NULL) {
  x = list(nx = nx, ny = ny, t = t)
  # create widget
  htmlwidgets::createWidget(
    name = 'rw',
    x,
    width = width,
    height = height,
    package = 'probArt'
  )
}

#' Widget output function for use in Shiny
#'
#' @export
rwOutput <- function(outputId, width = '100%', height = '400px'){
  shinyWidgetOutput(outputId, 'rw', width, height, package = 'probArt')
}

#' Widget render function for use in Shiny
#'
#' @export
renderRw <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  shinyRenderWidget(expr, rwOutput, env, quoted = TRUE)
}
