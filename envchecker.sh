if [ ! -f ".env" ]; then
    echo ".env não encontrado, criando um..."
    cat .env.example > .env
    echo ".env criado"
fi