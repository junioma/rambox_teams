// Script para manter o status do Teams ativo de forma eficiente no Rambox
// Simula uma pequena atividade periódica para evitar o status "Ausente".
// Versão: 1.0.0
// Data da última modificação: 2025-05-07

// --- Configurações ---
const activityInterval = 2 * 60 * 1000; // Intervalo da atividade: 2 minutos (120000 ms)
const initialDelay = 7000; // Espera inicial para garantir que o Teams carregue: 7 segundos (7000 ms)
const DEBUG_MODE = true; // Defina como true para logs detalhados, false para menos logs

// --- Funções de Logging ---
/**
 * Registra uma mensagem de log no console se o DEBUG_MODE estiver ativo.
 * @param {string} message A mensagem a ser registrada.
 */
function log(message) {
    if (DEBUG_MODE) {
        console.log(`[Teams Activity Script - ${new Date().toLocaleTimeString()}] ${message}`);
    }
}

/**
 * Registra uma mensagem de erro no console.
 * @param {string} message A mensagem de erro.
 * @param {Error|string} [e=''] O objeto de erro ou informação adicional.
 */
function error(message, e = '') {
    console.error(`[Teams Activity Script - ${new Date().toLocaleTimeString()}] ERROR: ${message}`, e);
}

// --- Simulação de Atividade ---
/**
 * Simula uma atividade do usuário para manter a sessão ativa.
 */
function simulateActivity() {
    log('Iniciando simulação de atividade...');
    try {
        const body = document.body;
        if (body) {
            // --- Escolha UMA das opções de simulação abaixo, ou combine com cuidado ---

            // Opção 1: Simular um movimento sutil do mouse no corpo do documento (RECOMENDADO)
            // Esta é geralmente uma forma de atividade de baixo impacto e eficaz.
            const mouseMoveEvent = new MouseEvent('mousemove', {
                bubbles: true,    // O evento propaga pela árvore DOM
                cancelable: true, // O evento pode ser cancelado
                clientX: Math.floor(Math.random() * 10) + 1, // Posição X aleatória pequena (1-10)
                clientY: Math.floor(Math.random() * 10) + 1, // Posição Y aleatória pequena (1-10)
                view: window      // Necessário para eventos de UI
            });
            body.dispatchEvent(mouseMoveEvent);
            log('Evento de movimento sutil do mouse disparado no body.');

            // Opção 2 (Alternativa): Simular um scroll mínimo e imperceptível
            // Descomente as três linhas abaixo e comente a Opção 1 se preferir esta.
            /*
            window.scrollBy(0, 1);
            window.scrollBy(0, -1);
            log('Scroll mínimo simulado (scrollBy 0,1 e 0,-1).');
            */

            // Opção 3 (Alternativa): Foco/Desfoco no body (do script original do usuário)
            // Descomente as linhas abaixo e comente as outras opções se preferir esta.
            // Pode ser menos sutil se houver listeners de foco/blur na página.
            /*
            if (document.hasFocus && document.hasFocus()) { // Só simula se a aba/janela tiver foco
                 body.focus();
                 log('Body focado.');
                 setTimeout(() => {
                     body.blur();
                     log('Body desfocado.');
                 }, 100); // Pequeno delay para o blur ser processado
            } else {
                 log('Aba não está em foco, pulando simulação de foco/desfoco.');
            }
            */

            log('Simulação de atividade concluída com sucesso.');
        } else {
            // Este erro pode ocorrer se o script for injetado antes do body estar pronto.
            // O delay inicial maior ajuda a mitigar isso.
            error('Elemento <body> não encontrado. A página pode não estar totalmente carregada ou o contexto do script é inválido.');
        }
    } catch (e) {
        error('Exceção durante a simulação de atividade:', e);
    }
}

// --- Inicialização do Script ---
log('Script de Atividade do Teams (Manter Ativo) carregado e configurado.');
log(`Intervalo de atividade configurado para: ${activityInterval / 1000} segundos.`);
log(`Delay inicial configurado para: ${initialDelay / 1000} segundos.`);
log(`Modo de Debug: ${DEBUG_MODE ? 'ATIVADO' : 'DESATIVADO'}.`);

setTimeout(() => {
    log('Delay inicial concluído. Iniciando simulação de atividade periódica agora.');
    simulateActivity(); // Executa a primeira simulação imediatamente após o delay
    setInterval(simulateActivity, activityInterval); // Configura para execuções periódicas
    log(`Próxima simulação de atividade em ${activityInterval / 1000 / 60} minutos.`);
}, initialDelay);

log('Script de Atividade do Teams aguardando o término do delay inicial...');
