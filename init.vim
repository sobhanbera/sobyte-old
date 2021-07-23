set noerrorbells
set mouse=a
set guicursor=
set tabstop=4 softtabstop=4
set shiftwidth=4
set expandtab
set smartindent
set relativenumber nu
set nowrap
set smartcase
set noswapfile
set nobackup
set undodir=~/.vim/undodir
set undofile
set incsearch
set nohlsearch
set hidden
set history=3333
set termguicolors
set scrolloff=7
set completeopt=menuone,noinsert,noselect
set colorcolumn=130
set signcolumn=yes
set cmdheight=1
set updatetime=200
set shortmess+=c
set splitright
set splitbelow

highlight ColorColumn ctermbg=0 guibg=lightgrey

colorscheme gruvbox
highlight Normal guibg=NONE

highlight OverLength ctermbg=NONE ctermfg=NONE guibg=#000000 guifg=#ADFF2F
match OverLength /\%130v.\+

